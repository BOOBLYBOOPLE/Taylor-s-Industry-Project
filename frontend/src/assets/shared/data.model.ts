export class employeeDataModel{
  constructor(
    public position: number,
    public name: string,
    public department: string,
    public title: string,
    public _id?: number){}
}

export class payrollDataModel{
  constructor(public date: Date, public amount: number){}
}

export class recruitmentDataModel{
  constructor(){}
}


