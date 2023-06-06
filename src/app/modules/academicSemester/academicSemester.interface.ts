import { Model } from 'mongoose'

export type IAccademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type IAcademicSemesterTitles = 'Autumn' | 'Summar' | 'Fall'
export type IAcademicSemesterCode = '01' | '02' | '03'
type IAcademicSemester = {
  title: IAcademicSemesterTitles
  year: number
  code: IAcademicSemesterCode
  startMonth: IAccademicSemesterMonth
  endMonth: IAccademicSemesterMonth
}

type AcademicSemesterModel = Model<IAcademicSemester>

export { IAcademicSemester, AcademicSemesterModel }
