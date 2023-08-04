import {createParamDecorator, ExecutionContext} from '@nestjs/common';
// Получаю данные из запроса  декоратором UserEmail
// UserEmail получает email из jwt token
// Получаю email из запроса который приходит в guard  

/*
createParamDecorator функция обёртка для декоратора
ExecutionContext  функ. контекста выполнения,
предоставляет методы для получения аргументов,
передаваемых обработчику,позволяет выбрать соответствующий контекст 
(например, HTTP, RPC (микросервис) или WebSockets)
*/

//UserEmail

export const UserEmail = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)



































// export const UserEmail = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext) => {
//       // Вся информация из Request
//       const request = ctx.switchToHttp().getRequest();
//       return request.user;
//     }
// )
