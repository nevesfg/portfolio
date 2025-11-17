import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("📧 Enviando email de:", body.email);

        // Enviar via Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "798edb33-cbba-433e-b141-4952069566dd",
                name: body.name,
                email: body.email,
                message: body.message,
                subject: "Novo contato do portfólio!",
                from_name: "Portfolio nevesfg.com",
            }),
        });

        const result = await response.json();
        console.log("📬 Web3Forms status:", response.status, result);

        if (response.ok && result.success) {
            return NextResponse.json({ success: true, message: "Email enviado com sucesso!" });
        } else {
            console.error("❌ Web3Forms error:", result);
            return NextResponse.json({ success: false, message: result.message || "Erro ao enviar email" }, { status: 500 });
        }
    } catch (error) {
        console.error("❌ Contact API error:", error);
        return NextResponse.json(
            { success: false, message: "Erro no servidor: " + (error instanceof Error ? error.message : "Unknown error") },
            { status: 500 }
        );
    }
}
