import Api from '@/services/Api'

export default {
    // ดึงข้อมูลสมาร์ทโฟนทั้งหมด
    index() {
        return Api().get('smartphones')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching smartphones:', error)
                throw error  // สามารถจัดการข้อผิดพลาดเพิ่มเติมได้ที่นี่
            })
    },
    
    // ดึงข้อมูลสมาร์ทโฟนตาม ID
    show(smartphoneId) {
        return Api().get(`smartphone/${smartphoneId}`)
            .then(response => {
                console.log(response.data); // Inspect the response here
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching smartphone with ID ${smartphoneId}:`, error);
                throw error;
            });
    },
    
    // เพิ่มข้อมูลสมาร์ทโฟนใหม่
    post(smartphone) {
        return Api().post('smartphones', smartphone)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating smartphone:', error)
                throw error
            })
    },
    
    // อัปเดตข้อมูลสมาร์ทโฟนที่มีอยู่
    put(smartphone) {
        return Api().put(`smartphone/${smartphone.id}`, smartphone)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating smartphone with ID ${smartphone.id}:`, error)
                throw error
            })
    },
    
    // ลบข้อมูลสมาร์ทโฟนตาม ID
    delete(smartphoneId) {
        return Api().delete(`smartphone/${smartphoneId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error deleting smartphone with ID ${smartphoneId}:`, error)
                throw error
            })
    },
}
