import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export const horaMes = ( fecha ) => {
 
    const hoyMes = format( new Date(fecha), 'h:mm a | MMM d', { locale: es } ).toUpperCase();

    return hoyMes;
    
}