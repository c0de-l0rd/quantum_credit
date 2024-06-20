import {db} from '@/firebase-config'
import {ref, set} from 'firebase/database'

const AddData = () => {

    set(ref(db, 'post/' + "name"), {
        name: 'marcy',
        phone: 968763903
    })
}

AddData()