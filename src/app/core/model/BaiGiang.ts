export interface BaiGiang {
  [x: string]: any;
  id:number,
  ten:string,
  mota:string,
  fileVideo:string,
  fileTaiLieu:string,
  chuongHoc:chuongHoc
}

interface chuongHoc {
  id: number,
  ten: string,
  monHoc: {
    id: string,
    ten: string,
    khoi: {
      id: number
      ten: string
    }
  },
}