import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback((text) => {
        if (window.M && typeof text === 'string') {
            window.M.toast({html: text, displayLength: 4000, classes: 'success'})
        }
        if (window.M && text) {
            window.M.toast({html: text, displayLength: 4000})
        }
    }, [])
}