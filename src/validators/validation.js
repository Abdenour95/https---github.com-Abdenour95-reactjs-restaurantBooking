export const validation = {
    validateBuffetName: (value) => {
      return value !== "";
    },
    validateEmail: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    validatePlateCount: (value) => {
      return value !== "" && value > 0;
    },
    validateBookedOn: (value) => {
        let formtdate = new Date(value);
        let todayDate = new Date ();
       return formtdate> todayDate;
    }
  };

  
  
  
  
  
  
  




// export const validation = {}


//     validation.validateBuffetN = (value) => {
//       return value != "";
//     },

//     validation.validateEmail= (value) => {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return emailRegex.test(value);
//     },

//     validation.validatePlateCount = (value) => {
//       return value != "" && value >= 0 ;
//     }

//     validation.bookedOn = (value) => {
//         let formtdate = new Date(value);
//         let todayDate = new Date ();
//         return formtdate> todayDate;
//       }
    
  
    
