<template>
    <device-modal v-model:dialogFormVisible="modalVisible" :actionType="modalAction" :deviceToEdit="selectedDevice">
    </device-modal>
    <div class="devices_table">
        <div class="devices_table__actions">
            <el-button type="primary" @click="handleCreate">Create</el-button>
        </div>
        <el-table v-loading="isLoading" :default-sort="{ prop: 'yearOfRelease', order: 'descending' }" border
            ref="multipleTableRef" :data="filterTableData">
            <el-table-column label="Model" property="model" />
            <el-table-column property="yearOfRelease" sortable label="Year of Release">
                <template #default="scope">
                    {{ convertTimestampToDate(scope.row.yearOfRelease) }}
                </template>
            </el-table-column>
            <el-table-column property="dateOfAdd" label="Added Date">

                <template #default="scope">
                    {{ convertTimestampToDate(scope.row.dateOfAdd) }}
                </template>
            </el-table-column>
            <el-table-column property="isVisible" label="Visible to Clients">

                <template #default="scope">
                    <el-tag :type="scope.row.isVisible ? 'success' : 'danger'" disable-transitions>
                        {{ scope.row.isVisible ? 'Visible' : 'Not Visible' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column property="category" label="Category" />
            <el-table-column prop="category" label="Filter" :filters="state.filterOptionsData"
                :filter-method="filterDataByCategory" filter-placement="bottom-end">

                <template #default="scope">
                    <el-tag type="primary" disable-transitions>
                        {{ scope.row.category }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">

                <template #header>
                    <el-input v-model="search" clearable placeholder="Type to search" />
                </template>

                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row)" title="Are you sure to delete this?">

                        <template #reference>
                            <el-button size="small" type="danger">Delete</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="devices_table__footer" v-model:current-page="state.currentTablePage" :page-size="pageSize"
            layout="prev, pager, next, jumper" :total="state.tableItemsSize"
            @current-change="handleCurrentPageChange" />
    </div>
</template>

<script setup lang="ts">
import DeviceModal from './device-modal.vue'
import convertTimestampToDate from '@/common/helpers/convertTimestampToDate'
import { useDevicesStore } from '../store/devices-store';
import { useDeviceTable } from '../hooks/use-device-table'

const { state } = useDevicesStore();

const {
    search,
    selectedDevice,
    modalAction,
    modalVisible,
    isLoading,
    pageSize,
    handleCurrentPageChange,
    filterDataByCategory,
    handleEdit,
    handleCreate,
    handleDelete,
    filterTableData
} = useDeviceTable()
</script>

<style lang="scss">
.devices_table {
    padding: 1rem;

    &__actions,
    &__footer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    &__actions {
        margin-bottom: 1rem;
    }

    &__footer {
        margin-top: 1rem;
    }
}
</style>