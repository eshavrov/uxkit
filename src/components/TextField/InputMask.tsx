import React from 'react';

import { composeRefs } from '@utils/composeRefs';

import { TextField} from '@components/TextField/TextField';

import { insertText } from './utils/insertText';

type TextFieldRootElement = React.ComponentRef<'input'>;

interface TextFieldInputProps {
  type?: any;
};

interface TextFieldRootProps extends TextFieldInputProps {
  mask: string;
  placeholder?: string;
  children?: any;
}

const useInputMask =(ref: any, mask: string, placeholder = '_') => {
  const cbInput = (e: any) => {
    const {inputType} = e;
    
    e.preventDefault();

    const input = ref.current;

    if (!input) {
      return;
    }

    if (inputType === 'insertText' || inputType === 'insertFromPaste' || inputType === 'deleteContentBackward' || inputType === 'deleteSoftLineBackward') {

      const { value, selectionStart, selectionEnd } = insertText({
        defaultValue: e.target.value,
        selectionEnd: e.target.selectionEnd,
        selectionStart: e.target.selectionStart,
        data: e.data,
        mask,
        inputType,
        placeholder,
      })

      input.value = value;

      if (selectionStart != null) {
        // Only some input types support this, browsers will throw an error if not supported
        try {
          input.setSelectionRange(selectionStart, selectionEnd);
        } catch {}
      }
    }
  };

  React.useEffect(()=>{
    ref.current.addEventListener('beforeinput', cbInput);  
  }, [])

}

export const InputMask = React.forwardRef<TextFieldRootElement, TextFieldRootProps>(
  (props, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {  mask, placeholder ='_', ...inputProps } = props; 

    const [defaultValue] = React.useState(() => mask.replace(/\d/g, placeholder));

    useInputMask(inputRef, mask, placeholder);

    return (
      <TextField
        {...inputProps}
        ref={composeRefs(inputRef, forwardedRef)}
        defaultValue={defaultValue}
      />
    );
  }
);

InputMask.displayName = 'TextField.InputMask';

export { InputMask as Root,};
