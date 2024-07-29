import { ref, set, remove } from 'firebase/database'
import { db } from '@/firebase-config'

interface myPaths {
    setPath: string,
    removePath: string
    cardDetails: any
}
 
async function useUpdateDB({setPath, removePath, cardDetails}:myPaths){

      /**
 * inserts an item into Firebase Realtime Database then deletes the same item in the running loans DB
 * @param void
 */


        // push data to firebase

        try{

            await set(ref(db, setPath), {
                id: cardDetails.id,
            firstName: cardDetails.firstName,
            lastame: cardDetails.lastName,
            phone: cardDetails.phone,
            loanAmount: cardDetails.loanAmount,
            interestRate: cardDetails.interestRate,
            lentOn: cardDetails.lentOn,
            dueOn: cardDetails.dueOn,
        })
    } catch(error){
        console.error(`failed to set item in DB due to: ${error}`)
    }
        
       finally {
    
    /**
 * Deletes an item from Firebase Realtime Database
 * @param void
 */
     const removeItemFromRunningLoans = async() => {

        await remove(ref(db, removePath))
    }

    removeItemFromRunningLoans()
}

}

export default useUpdateDB