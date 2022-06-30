
import { useEffect, useMemo, useState } from 'react';

export const useForm = <T extends Object>(initState: T, formValidations: any = {}) => {

    const [formState, setFormState] = useState<any>(initState);
    const [formValidation, setFormValidation] = useState<any>({})

    useEffect(() => {
        createValidators();
    }, [formState])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false
        }

        return true
    }, [formValidation])

    const onChange = (value: string, field: keyof T) => {
        setFormState({
            ...formState,
            [field]: value
        });
    }

    const createValidators = () => {
        const formCheckedValues: any = {}

        for (const formField of Object.keys(formValidations)) {
            const [functionxd, errorMessage] = formValidations[formField]

            formCheckedValues[`${formField}Valid`] = functionxd(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues)
    }

    return {
        ...formState,
        onChange,
        ...formValidation,
        isFormValid
    }
}