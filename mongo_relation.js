const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/mongo_relation", { useNewUrlParser: true, useUnifiedTopology: true })


const EmployeeSchema = mongoose.Schema({
    name: String,
    age: Number,
    department: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "departments"
    }
})

EmployeeSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

EmployeeSchema.set('toJSON', {
    virtuals: true
})

const DepartmentSchema = mongoose.Schema({
    name: String,
    employees: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "employees"
        }
    ]
})

DepartmentSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

DepartmentSchema.set('toJSON', {
    virtuals: true
})

let addRecs = async () => {
    const Department = mongoose.model('Department', DepartmentSchema, 'departments')
    const department = {
        name: "tech"
    }

    const savedDepartment = new Department(department)
    await savedDepartment.save()
    const depId = savedDepartment['id']

    const allDepartments = await Department.find()

    console.log("allDepartments")
    console.log(allDepartments)


    const Employee = mongoose.model('Employee', EmployeeSchema, 'employees')
    const employee = {
        name: "henry",
        age: 21,
        department: depId
    }

    const savedEmployee = new Employee(employee)
    await savedEmployee.save()
    const empId = savedEmployee['id']

    const allEmployees = await Employee.find()

    console.log("allEmployees")
    console.log(allEmployees)

    await mongoose.connection.close()

    

}

addRecs()




