let empPayrollList ;
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmployeePayrollDataFromLocalStorage();
   //empPayrollList = createEmployeePayrollJSON();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromLocalStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
};

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml =
        "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
        if(empPayrollList.length == 0) return;
        let innerHtml = `${headerHtml}`;
        for(const empPayrollData of empPayrollList){
             innerHtml = `${innerHtml}
             <tr>
                     <td><img class="profile" alt="" src="${empPayrollData._profilePic}" ></td>
                     <td>${empPayrollData._name}</td>
                     <td>${empPayrollData._gender}</td>
                     <td>${getDeptHtml(empPayrollData._department)}</td>
                     <td>${empPayrollData._salary}</td>
                     <td>${stringifyDate(empPayrollData._startDate)}</td>
                     <td>
                         <img id="${empPayrollData._id}" onclick="remove(this)"  src="../Assets/icons/delete-black-18dp.svg" alt="delete">
                         <img id="${empPayrollData._id}" onclick="update(this)"  src="../Assets/icons/create-black-18dp.svg" alt="edit">
                     </td>
                 </tr>
             `;
             document.querySelector('#table-display').innerHTML = innerHtml;
        }
        document.querySelector("#table-display").innerHTML = innerHtml;
     }
     const getDeptHtml = (deptList) => {
         let deptHtml = '';
         for(const dept of deptList){
             deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
         }
         return deptHtml;
     }
     const createEmployeePayrollJSON = () => {
         let empPayrollListLocal = [
             {
                 _name:'Tony Stark',
                 _gender:'male',
                 _department:['Engineering',
                                'Finance'],
                 _salary:'500000',
                 _startDate:'29 Oct 2019',
                 _note: '',
                 _id: new Date().getTime(),
                 _profilePic:'../Assets/Ellipse -2.png'
             },
             {
                 _name:'Riya Dalal',
                 _gender:'female',
                 _department:['Sales'],
                 _salary:'400000',
                 _startDate:'28 Feb 2019',
                 _note:'',
                 _id: new Date().getTime()+1,
                 _profilePic:'../Assets/Ellipse -1.png'
             },
             {
                 _name:'Shiv Kumar',
                 _gender:'male',
                 _department:['Finance'],
                 _startDate:'17 Nov 2018',
                 _note:'',
                 _salary:'600000',
                 _id: new Date().getTime()+2,
                 _profilePic:'../Assets/Ellipse -9.png'
             }
         ]
         return empPayrollListLocal;
     } 
   
//removing data
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
    if(!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id)
                                 .indexOf(empPayrollData._id);
     empPayrollList.splice(index,1);
     localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
     document.querySelector(".emp-count").textContent = empPayrollList.length;
     createInnerHtml();
}
                                
        