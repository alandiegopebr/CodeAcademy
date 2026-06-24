"use client"
import useAuth from '@/hooks/useAuth'
import { isAdmin } from '@/lib/admin'
import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'

export default function AdminLessonsPage(){
  const { user, loading } = useAuth();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(10)
  const [status, setStatus] = useState('')

  async function createLesson(e: React.FormEvent){
    e.preventDefault()
    if (!user || !isAdmin(user)) {
      setStatus('Você não tem permissão para criar esta aula.')
      return
    }

    try{
      await addDoc(collection(db,'lessons'), { title, description, points })
      setStatus('Aula criada com sucesso')
      setTitle(''); setDescription(''); setPoints(10)
    }catch(err){
      setStatus('Erro ao criar aula: ' + (err as any).message)
    }
  }

  if (loading) {
    return <div className="p-6 text-slate-200">Verificando permissão...</div>
  }

  if (!user || !isAdmin(user)) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Acesso negado</h2>
        <p className="text-slate-400">Somente o administrador pode criar aulas aqui.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Criar aula</h2>
      <form onSubmit={createLesson} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Pontos</label>
          <input type="number" value={points} onChange={(e)=>setPoints(Number(e.target.value))} className="w-24 border rounded p-2" />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">Criar</button>
        </div>
        {status && <div className="text-sm text-gray-200">{status}</div>}
      </form>
    </div>
  )
}
