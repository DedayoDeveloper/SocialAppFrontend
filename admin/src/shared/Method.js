export const checkValidity = (value, rules) =>{
    let isValid = true;
    let errorMsg = null;
   
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        if(!isValid){
            errorMsg="This field is required";
        }
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        if(!isValid){
            errorMsg="Minimum length is "+rules.minLength;
        }
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        if(!isValid){
            errorMsg="Minimum length is "+rules.maxLength;
        }
    }

    if(rules.email){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        
        isValid = pattern.test(value) && isValid;
        if(!isValid){
            errorMsg="Email is invalid";
        }
    }

    if(rules.isNumber){
        let pattern = /^\d+$/;
        isValid = pattern.test(value)  && isValid;  

        if(!isValid){
            errorMsg="Field must be a number";
        }
    }

    // if(rules.isFile){
        
    //     isValid = value.size <= 1024
    //     if (!isValid){
    //         errorMsg = "Image too large.";
    //     }
        
    // }

    return [errorMsg, isValid];
}

export const LOGGER = (key, value) => {
    console.log(key.toUpperCase(), value);
};


export const formatDate = (date) => {



    const newDate = new Date(date);
        console.log(`Date:`, newDate);
        let month = String(newDate.getMonth()+1).padStart(2, '0');
        let day = String(newDate.getDate()).padStart(2, '0');
        let year = newDate.getFullYear();
        let output = year+'-'+month+'-'+day;
        return output;
}


export const formatDate2 = (date) => {



    const newDate = new Date(date);
        console.log(`Date:`, newDate);
        //let month = String(newDate.getMonth()+1).padStart(2, '0');
        let monthName = newDate.toLocaleString('default', { month: 'long' });;
        let day = String(newDate.getDate()).padStart(2, '0');
        let dayName = newDate.toLocaleString('en-us', {weekday:'long'});
        let year = newDate.getFullYear();
        let output = dayName+', '+day+' '+monthName+' '+year;
        return output;
}


export const formatCurrency =(num)=> {
    var p = num.toFixed(2).split(".");
    var chars = p[0].split("").reverse();
    var newstr = '';
    var count = 0;
    for (let x in chars) {
        count++;
        if(count%3 === 1 && count !== 1) {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    return newstr;
    //return newstr + "." + p[1];
}

export function paginator( arr, perPage )
{
	if ( perPage < 1 || !arr ) return () => [];
	
	return function( page ) {
		const basePage = (page - 1) * perPage;
	
		return page < 0 || basePage >= arr.length 
			? [] 
			: arr.slice( basePage,  basePage + perPage );
	};
}

export const generatePriceRange =() =>{
    for (let index = 0; index < 15; index++) {
        return index++
        
    }
}

export const isEmpty = (obj)=> {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}




