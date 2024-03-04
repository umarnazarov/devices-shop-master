<template>
    <div>
        <el-dialog :model-value="dialogFormVisible" :title="dialogTitle" width="500" :before-close="closeModal">
            <el-form ref="ruleFormRef" :rules="formRules" :model="form" label-position="top">
                <el-form-item label="Model name" :label-width="formLabelWidth" prop="model">
                    <el-input v-model="form.model" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Category" :label-width="formLabelWidth" prop="category">
                    <el-select v-model="form.category" placeholder="Please select category">
                        <el-option v-for="item in state.filterOptionsData" :key="item.value" :label="item.text"
                            :value="item.value">
                            {{ item.text }}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Price" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.price" placeholder="Please add price" :formatter="formatPrice"
                        :parser="parsePrice" />
                </el-form-item>

                <el-form-item label="Year of Release" :label-width="formLabelWidth" prop="yearOfRelease">
                    <el-date-picker v-model="form.yearOfRelease" type="date" placeholder="Select date" />
                </el-form-item>
                <el-form-item prop="isVisible">
                    <el-checkbox v-model="form.isVisible" label=" Make it Public" size="large" />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closeModal">Cancel</el-button>
                    <el-button :loading="isLoading" type="primary" @click="saveDevice">
                        Save
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { useFormDialog } from '../hooks/use-form-dialog';
import { useDevicesStore } from '../store/devices-store';
import formatPrice from '@/common/helpers/formatPrice'
import parsePrice from '@/common/helpers/parsePrice'

import { IDevice, ModalActionEnum } from '../types';


const emit = defineEmits(['update:dialogFormVisible'])

const props = defineProps({
    deviceToEdit: {
        type: Object as () => IDevice | null,
        required: false
    },
    actionType: {
        type: String as () => ModalActionEnum,
        required: false,
        default: ModalActionEnum.CREATE
    },
    dialogFormVisible: {
        type: Boolean,
        required: true,
        default: false
    },
})

const { state } = useDevicesStore()
const { ruleFormRef, isLoading, formLabelWidth, form, formRules, saveDevice, dialogTitle, closeModal } = useFormDialog(props, emit);

</script>
