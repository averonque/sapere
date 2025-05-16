<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(auth()->user()->tasks);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,completed'
        ]);

        $task = auth()->user()->tasks()->create($fields);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'due_date' => 'sometimes|required|date',
            'status' => 'sometimes|required|in:pending,completed'
        ]);

        $task->update($fields);

        return response()->json($task, 200);
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted'], 200);
    }
}
