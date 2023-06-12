import {
  IAcademicSemesterCode,
  IAcademicSemesterTitles,
  IAccademicSemesterMonth,
} from './academicSemester.interface'

export const academicSemesterMonths: IAccademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summar',
  'Fall',
]
export const academicSemesterCodes: IAcademicSemesterCode[] = ['01', '02', '03']

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
}

export const academicSemesterSearchAbleFields = ['title', 'code', 'year']

export const academicSemesterFilterAbleFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]
