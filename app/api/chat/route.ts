import { NextResponse } from 'next/server';
import { projects } from '@/data/projects';
import { coreSkillGroups, aiSkillGroups } from '@/data/skills';
import { site } from '@/data/site';

export const runtime = 'nodejs';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Groq API key is missing. Add GROQ_API_KEY to .env.local or Vercel environment variables.' },
      { status: 500 },
    );
  }

  let body: { message?: string };
  try {
    body = (await request.json()) as { message?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid chat request.' }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 220,
      messages: [
        {
          role: 'system',
          content: [
            'You are a concise portfolio assistant for Muhammad Sufiyan.',
            'Answer only from the provided portfolio facts.',
            'Do not invent experience, companies, ratings, clients, metrics, or advanced AI claims.',
            'If asked about hiring or detailed discussion, guide the user to contact Muhammad Sufiyan.',
            `Name: ${site.name}`,
            `Role: ${site.role}`,
            `Location: ${site.localLocation}`,
            `Email: ${site.email}`,
            `GitHub: ${site.github}`,
            `Core skills: ${coreSkillGroups.map((group) => `${group.title}: ${group.skills.join(', ')}`).join(' | ')}`,
            `AI foundations: ${aiSkillGroups.map((group) => `${group.title}: ${group.skills.join(', ')}`).join(' | ')}`,
            `Projects: ${projects.map((project) => `${project.name} (${project.category}) - ${project.description}`).join(' | ')}`,
          ].join('\n'),
        },
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `Groq request failed: ${response.status}. ${errorText.slice(0, 180)}` },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const reply = data.choices?.[0]?.message?.content?.trim();

  return NextResponse.json({
    reply: reply || 'I could not generate a response right now. Please use the contact form.',
  });
}
