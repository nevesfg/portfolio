import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI || "https://nevesfg.com/auth/linkedin/callback",
    client_id: process.env.LINKEDIN_CLIENT_ID || "",
    client_secret: process.env.LINKEDIN_CLIENT_SECRET || "",
  });

  try {
    // Troca code por access token
    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "No access token" }, { status: 400 });
    }


    // Busca dados do usuário usando OpenID Connect endpoint
    const userinfoRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json'
      },
    });

    if (!userinfoRes.ok) {
      console.error("❌ Erro ao buscar userinfo:", userinfoRes.status, userinfoRes.statusText);
      const errorText = await userinfoRes.text();
      console.error("Error details:", errorText);
      return NextResponse.json({ error: "Failed to fetch user info", status: userinfoRes.status }, { status: 400 });
    }

    const userinfo = await userinfoRes.json();

    // Criar URL de busca do LinkedIn baseada no nome
    const searchName = encodeURIComponent(userinfo.name || `${userinfo.given_name || ''} ${userinfo.family_name || ''}`.trim());
    const profileUrl = `https://www.linkedin.com/search/results/people/?keywords=${searchName}`;

    const userData = {
      id: userinfo.sub,
      name: userinfo.name || `${userinfo.given_name || ''} ${userinfo.family_name || ''}`.trim(),
      profilePicture: userinfo.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userinfo.name || 'User')}&background=0077b5&color=fff&size=128`,
      email: userinfo.email || null,
      profileUrl: profileUrl
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("LinkedIn API error:", error);
    return NextResponse.json({ error: "Failed to authenticate with LinkedIn" }, { status: 500 });
  }
}