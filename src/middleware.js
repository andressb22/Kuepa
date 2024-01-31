import { NextResponse } from "next/server";


export function middleware (request){

    if(request.nextUrl.pathname == '/reunion'){
        let token = request.cookies.get('token')
        
        if(token === undefined){
            return NextResponse.redirect(new URL('/',request.url))
        }
    }

    return NextResponse.next()
}