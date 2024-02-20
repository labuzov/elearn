import { memo, useMemo } from 'react';
import ReactSelect from 'react-select';

import styles from './Select.module.scss';
import classNames from 'classnames';


export type SelectOption = {
    value: string | number;
    label: string;
}

export type SelectProps = {
    value?: string | number | null;
    options?: SelectOption[];
    disabled?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    isLoading?: boolean;
    placeholder?: string;
	invalid?: boolean;
	validationErrors?: string[];
    onChange?: (value: string | number | null) => void;
    renderCustomLabel?: (option: SelectOption) => JSX.Element;
};

export const Select = memo((props: SelectProps) => {
	const {
        invalid, validationErrors, value, options, disabled,
        isSearchable, isClearable, isLoading, placeholder,
        onChange, renderCustomLabel
    } = props;

	const isInvalid = invalid || validationErrors?.length;

	// const renderFeedback = () => {
	// 	if (!validationErrors?.length) return null;

	// 	return (
	// 		<FormFeedback>
	// 			{validationErrors.join(' ')}
	// 		</FormFeedback>
	// 	)
	// }

    const handleChange = (option: SelectOption) => {
        onChange?.(option?.value ?? null);
    }

    const selectedValue = useMemo(() => {
        if (!value) return null;

        return options.find(option => option.value === value) ?? null;
    }, [value, options]);

	return (
		<>
			<ReactSelect
                value={selectedValue}
                options={options}
                classNamePrefix="select"
                className={classNames(styles.select, isSearchable && styles.searchable)}
                isSearchable={!!isSearchable}
                isClearable={!!isClearable}
                isLoading={isLoading}
                isDisabled={disabled}
                placeholder={placeholder ?? ''}
                menuPlacement="auto"
                blurInputOnSelect
                noOptionsMessage={() => 'Ничего не найдено'}
                loadingMessage={() => 'Загрузка...'}
                formatOptionLabel={renderCustomLabel}
                onChange={handleChange}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: (state.isFocused || state.menuIsOpen) ? 'var(--color-primary) !important' : 'var(--color-input-border)',
                        borderWidth: 2,
                        borderRadius: 8,
                        minHeight: 40,
                        boxShadow: 'none',
                    }),
                    valueContainer: (baseStyles) => ({
                        ...baseStyles,
                        fontSize: 'inherit',
                        fontFamily: 'inherit'
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        borderRadius: 8
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: 'inherit',
                        fontFamily: 'inherit'
                    }),
                    option: (baseStyles) => ({
                        ...baseStyles,
                        padding: '10px 12px',
                        cursor: 'pointer',
                        color: 'inherit',
                        fontFamily: 'inherit'
                    }),
                    indicatorsContainer: (baseStyles) => ({
                        ...baseStyles,
                        padding: '0 4px'
                    }),
                    indicatorSeparator: () => ({
                        display: 'none'
                    }),
                }}
            />
			{/* {renderFeedback()} */}
		</>
	);
});