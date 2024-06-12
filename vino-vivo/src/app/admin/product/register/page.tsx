import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Register from "@/components/product/register/Register";
import { DecodedToken } from "@/types/user/user.type";
import { getServerSession } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";


export default async function ProductRegister() {
    const session = await getServerSession(authOptions);
    let decodedToken: DecodedToken | null = null;
    if (session?.accessToken) {
      decodedToken = await jwtDecode<DecodedToken>(session.accessToken);
    }
    const isAdmin = decodedToken?.realm_access?.roles.includes('admin');
    return (    
        isAdmin ? ( 
            <Register/>   
        ) : (
            <div>
        {redirect("/")}
      </div>
        )   
    )
}