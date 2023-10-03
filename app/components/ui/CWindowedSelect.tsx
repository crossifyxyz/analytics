import { Props as SelectProps } from 'react-select'
import WindowedSelect from 'react-windowed-select'
import { createFilter } from 'react-select'
import { useColorModeValue } from '@chakra-ui/react'

export default function CWindowedSelect({
  ...props
}: SelectProps & React.RefAttributes<unknown>) {
  const bgColor = useColorModeValue('white', '#2E303A')
  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: bgColor,
      borderRadius: '1rem',
      minWidth: '200px',
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'current',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '1rem',
      backgroundColor: bgColor,
      fontSize: 10,
      color: 'current',
      textAlign: 'center',
    }),
    menuList: (provided: any) => {
      return {
        ...provided,
        '& :first-of-type': {
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
        },
        '& :last-of-type': {
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
        },
      }
    },
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused && 'black',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      borderRadius: '1rem',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      borderBottomRightRadius: '1rem',
      borderTopRightRadius: '1rem',
    }),
  }

  return (
    <WindowedSelect
      {...props}
      classNamePrefix="coin-select"
      filterOption={createFilter({ ignoreAccents: false })}
      windowThreshold={50}
      styles={selectStyles}
    />
  )
}
