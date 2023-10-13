export interface HhResponse {
    Date: string
    PreviousDate: string
    PreviousURL: string
    Timestamp: string
    Valute: Valute
  }
  
  export interface Valute {
    USD: Usd
    EUR: Eur
    MDL: Mdl
   }
  
  
  export interface Usd {
    ID: string
    NumCode: string
    CharCode: string
    Nominal: number
    Name: string
    Value: number
    Previous: number
  }
  
  export interface Eur {
    ID: string
    NumCode: string
    CharCode: string
    Nominal: number
    Name: string
    Value: number
    Previous: number
  }
  
  
  
  export interface Mdl {
    ID: string
    NumCode: string
    CharCode: string
    Nominal: number
    Name: string
    Value: number
    Previous: number
  }