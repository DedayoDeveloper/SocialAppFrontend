const dataOne = {
    sex: {
        elementType: 'select',
        elementConfig: {
            type: 'select',
            options: [
                { value: '', displayValue: 'Select Options', defaultValue: true, disabled: '' },
                { value: 'male', displayValue: 'Male' },
                { value: 'female', displayValue: 'Female' }
            ]
        },
        label: 'I am a...',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
    category: {
        elementType: 'select',
        elementConfig: {
            type: 'select',
            options: [
                { value: '', displayValue: 'Select Options', defaultValue: true, disabled: '' },
                { value: 'Relationship', displayValue: 'Relationship' },
                { value: 'FriendWithBenefit', displayValue: 'Friends with Benefits' },
                { value: 'SexHookUp', displayValue: 'Sex Hookup' },
                { value: 'SugarMummy', displayValue: 'Sugar Mummy' },
                { value: 'SugarDaddy', displayValue: 'Sugar Daddy' },
                { value: 'Strippers', displayValue: 'Strippers' },
                { value: 'PartyStarters', displayValue: 'Party Starters' }
            ]
        },
        label: 'I am looking For ...',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    }
}

const dataTwo = {
    firstname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'e.g john'
        },
        label: 'First Name',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
    lastname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'e.g smith'
        },
        label: 'Last Name',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
    username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'e.g john001'
        },
        label: 'Username',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
    phonenumber: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'e.g 08067278197'
        },
        label: 'Phone Number',
        value: '',
        validation: {
            required: true,
            isNumber: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'e.g myemail@gmail.com'
        },
        label: 'Email Address',
        value: '',
        validation: {
            required: true,
            email: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: ''
        },
        label: 'Password',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        errorMsg: null
    },
}

const formOne = {
    firstname: {
        title: "What’s your first name?",
        info: "Can't change it later."
    },
    birthday: {
        title: 'Your birthday?',
        info: 'Your profile shows your age not birthday.'
    },
    gender: {
        title: "What's your gender?"
    },
    orientation: {
        title: "What's your sexual orientation?"
    },
    interests: {
        title: "Who are you interested in seeing?",
    },
    lookingfor: {
        title: "What are you looking for?",
        info: "There is something for everyone."
    },
    activities:{
        title: "What are you into?",
        info: "Let people know what you enjoy."
    },
    photos: {
        title: "Add your recent pictures",
        info: "Upload 1 to start."
    }
}


export {dataOne, dataTwo, formOne}