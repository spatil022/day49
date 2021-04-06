//UC 2
let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function () {
            if (name.value.length == 0) {
                textError.textContent = "";
                return;
            }
            try {
                (new EmployeePayroll()).name = name.value;
                textError.textContent = "";
            } catch (e) {
                textError.textContent = e;
            }
        });
    
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
        });

       // checkForUpdate();
});

//UC3
const save = () => {
    try{
        let employeePayRollData = createEmployeePayRoll();
        createAndUpdateStorage(employeePayRollData);
    }catch(e){
        return;
    }
};

//UC 4
function createAndUpdateStorage (employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayRoll = () => {
    let employeePayRollData = new EmployeePayroll();
    employeePayRollData.id = new Date().getTime();
    try{
        employeePayRollData.name=getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error', e)
        throw e;
    }
    employeePayRollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayRollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayRollData.department=getSelectedValues('[name=department]');
    employeePayRollData.salary=getInputValueById('#salary');
    employeePayRollData.note=getInputValueById('#note');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayRollData.date = Date.parse(date);
    alert(employeePayRollData.toString());
    return employeePayRollData;
};

const getSelectedValues=(propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [] ;
    allItems.forEach(item=>{
        if(item.checked)
        selItems.push(item.value);
    });
    return selItems;
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value
    return value
};

//UC5
const resetForm = ()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#note','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}
const unsetSelectedValues = (propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    })
}
const setTextValue=(id,value)=>{
    const element = document.querySelector(id);
    element.textContent=value;
}
const setValue = (id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
} 

