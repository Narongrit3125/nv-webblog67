import Api from '@/services/Api'

export default {
    // ดึงข้อมูลสมาร์ทโฟนทั้งหมด
    index() {
        return Api().get('smartphones')
    },
    
    // ดึงข้อมูลสมาร์ทโฟนตาม ID
    show(smartphoneId) {
        return Api().get('smartphone/' + smartphoneId)
    },
    
    // เพิ่มข้อมูลสมาร์ทโฟนใหม่
    post(smartphone) {
        return Api().post('smartphone', smartphone)
    },
    
    // อัปเดตข้อมูลสมาร์ทโฟนที่มีอยู่
    put(smartphone) {
        return Api().put('smartphone/' + smartphone.id, smartphone)
    },
    
    // ลบข้อมูลสมาร์ทโฟนตาม ID
    delete(smartphone) {
        return Api().delete('smartphone/' + smartphone.id)
    },
}
