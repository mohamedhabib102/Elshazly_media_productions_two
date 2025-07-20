import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// ✅ POST - create a new item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, data } = body;

    if (!id || !data) {
      return NextResponse.json({ error: 'Missing ID or data' }, { status: 400 });
    }

    const docRef = doc(db, 'media', id);
    await setDoc(docRef, data);

    return NextResponse.json({ message: 'Created successfully', id });
  } catch (error) {
    console.error('❌ Error creating document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}