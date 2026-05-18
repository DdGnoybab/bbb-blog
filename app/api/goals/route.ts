import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getAllGoals, getActiveGoals, createGoal } from '@/lib/goals'

export async function GET(request: NextRequest) {
  const admin = request.nextUrl.searchParams.get('admin') === 'true'
  if (admin && !(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(admin ? getAllGoals() : getActiveGoals())
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  if (!body.title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }
  const goal = createGoal(body)
  return NextResponse.json(goal, { status: 201 })
}
