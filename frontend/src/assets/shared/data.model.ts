export class employeeDataModel{
  constructor(
    public position: number,
    public name: string,
    public department: string,
    public title: string,
    public phoneNumber: string,
    public status: String,
    public _id?: number,
  ){}
}

export class emailDataModel{
  constructor(
    public userID: string,
    public sender: string,
    public recipient: string,
    public subject: string,
    public content: string,
    public draft: boolean,
    public important: boolean,
    public trashed: boolean,
    public spam: boolean,
    public sent: boolean,
    public received: boolean,
    public sendDate: Date
  ){}
}

export class payrollDataModel{
  constructor(
    public date: Date,
    public amount: number,
    public hrsWorked: Number,
    public netPay: Number
  ){}
}

export class attendanceDataModel{
  constructor(
    public status: String
  ){}
}

export class leavesDataModel{
  constructor(
    public type: String,
    public dateStart: Date,
    public dateEnd: Date,
    public status: String
  ){}
}

export class complaintsDataModel{
  constructor(
    public type: String,
    public summary: String,
    public date: Date
  ){}
}

export class formsDataModel{
  constructor(
    public fileName: String,
    public submittedBy: String,
    public description: String,
    public size: String,
    public submit: String,
    public date: Date
  ){}
}

export class recruitmentDataModel{
  constructor(
    public name: String,
    public age: number,
    public university: String,
    public date: Date,
    public status: String,
  ){}
}
