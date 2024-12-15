<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Fetch users where 'admin' column is 0
        $users = User::where('admin', 0)->get();
        return Inertia::render('User/index', ['users' => $users]);
    }

    /**
     * Delete a user.
     * 
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete($id)
    {
        $user = User::findOrFail($id);

        // Add authorization or other checks if needed here
        $user->delete();

        return Redirect::back()->with('message', 'User successfully deleted.');
    }

    /**
     * Activate a user.
     * 
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function activate($id)
    {
        $user = User::findOrFail($id);

        // Check if the user is already active to prevent unnecessary operations
        if (!$user->verified_user) {
            $user->verified_user = true;
            $user->save();

            return Redirect::back()->with('message', 'User activated successfully.');
        }

        return Redirect::back()->with('message', 'User is already active.');
    }
}
