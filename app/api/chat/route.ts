import { NextResponse } from 'next/server';
import { projects } from '@/data/projects';
import { additionalSkillGroups, coreSkillGroups } from '@/data/skills';
import { site } from '@/data/site';

export const runtime = 'nodejs';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function getLocalReply(message: string) {
  const text = message.toLowerCase();
  const wantsContact =
    /contact|phone|mobile|number|call|email|mail|linkedin|github|instagram|facebook|whatsapp/.test(text);
  const wantsSkills = /skill|tech|technology|stack|java|spring|react|sql|javascript/.test(text);
  const wantsProjects = /project|filewalatool|mangalok|resume/.test(text);

  if (wantsContact) {
    return [
      `You can contact ${site.name} by email at ${site.email}.`,
      `Mobile: ${site.phone}.`,
      `GitHub: ${site.github}`,
      `LinkedIn: ${site.linkedin}`,
      `Instagram: ${site.instagram}`,
      `Facebook: ${site.facebook}`,
    ].join('\n');
  }

  if (wantsProjects) {
    return `Featured projects include ${projects
      .map((project) => `${project.name}: ${project.tagline}`)
      .join(' ')}`;
  }

  if (wantsSkills) {
    return `${site.name} works with ${coreSkillGroups
      .flatMap((group) => group.skills)
      .join(', ')}.`;
  }

  return null;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

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

  if (!apiKey) {
    const localReply = getLocalReply(message);
    return NextResponse.json({
      reply:
        localReply ||
        `I can answer questions about ${site.name}'s skills, projects, and contact details. You can contact him at ${site.email} or ${site.phone}.`,
    });
  }

  try {
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
              'Do not invent experience, companies, ratings, clients, metrics, or AI claims.',
              'If asked about hiring or detailed discussion, guide the user to contact Muhammad Sufiyan.',
              `Name: ${site.name}`,
              `Role: ${site.role}`,
              `Location: ${site.localLocation}`,
              `Email: ${site.email}`,
              `Mobile: ${site.phone}`,
              `GitHub: ${site.github}`,
              `LinkedIn: ${site.linkedin}`,
              `Instagram: ${site.instagram}`,
              `Facebook: ${site.facebook}`,
              `Core skills: ${coreSkillGroups.map((group) => `${group.title}: ${group.skills.join(', ')}`).join(' | ')}`,
              `Additional skills: ${additionalSkillGroups.map((group) => `${group.title}: ${group.skills.join(', ')}`).join(' | ')}`,
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
      const localReply = getLocalReply(message);
      return NextResponse.json({
        reply: localReply || `I can help with portfolio basics. You can contact ${site.name} at ${site.email} or ${site.phone}.`,
      });
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply: reply || `You can contact ${site.name} at ${site.email} or ${site.phone}.`,
    });
  } catch {
    const localReply = getLocalReply(message);
    return NextResponse.json({
      reply: localReply || `I can help with portfolio basics. You can contact ${site.name} at ${site.email} or ${site.phone}.`,
    });
  }
}
