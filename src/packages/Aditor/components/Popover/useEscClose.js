import {useEffect} from 'react';
import PopoverManager from '../../PopoverManager';

function useEscClose(){
    useEffect(() => {
        function onKeyDown(event){
            if (event.key === 'Escape' && PopoverManager.isTopPopover()) {
                PopoverManager.closePopover();
            }
        }

        document.body.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.removeEventListener('keydown', onKeyDown);
        };
    });
}

export default useEscClose;
