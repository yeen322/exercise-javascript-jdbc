export class Entertainment {
    constructor(
        public department?: Department,
        public employee?: Employee,
        public drama?: Drama,
        public movie?: Movie,
        public music?: Music,
        public partMusic?: PartMusic,
        public partMovie?: PartMovie,
        public partDrama?: PartDrama,
        public relDepartment?: RelDepartment,
        public empRole?: EmpRole
    ) {}
}


export class Department {
    constructor(
        public deptCode?: string,
        public deptName?: string,
        public deptLoc?: string

    ) {}
}

export class Employee {
    constructor(
        public empCode?: string,
        public empName?: string,
        public empMgt?: string,
        public empSal?: number

    ) {}
}

export class EmpRole {
    constructor(
        public empRcode?: string,
        public empRname?: string
    ) {}
}

export class RelDepartment {
    constructor(
        public rdDeptCode? : string,
        public rdEmpCode? : string
    ) {}
}

export class Drama {
    constructor(
        public drmCode?: string,
        public drmName?: string,
        public drmPrd?: string,
        public drmBrd?: string,
        public drmOpDate?: Date
    ) {}
}

export class Movie {
    constructor(
        public movCode?: string,
        public movName?: string,
        public movMpaa?: string,
        public movPdDate?: Date,
        public movOpDate?: Date
    ) {}
}

export class Music {
    constructor(
        public mscCode?: string,
        public mscName?: string,
        public mscDate?: Date,
        public mscPrice?: number,
        public mscCsf?: string
    ) {}
}

export class PartMovie {
    constructor(
        public pmMovRole?: string,
        public pmMovFee?: number
    ) {}
}

export class PartDrama {
    constructor(
        public pdEmpRole? : string,
        public pdEmpFee? : number
    ) {}
}

export class PartMusic {
    constructor(
        public pmEmpRole?: string,
        public pmEmpFee?: number
    ) {}
}


