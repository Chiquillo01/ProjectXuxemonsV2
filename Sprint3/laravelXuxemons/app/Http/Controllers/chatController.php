<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class chatController extends Controller
{
    public function message(Request $request)
    {

        $user = $request->input('userName');
        $text = $request->input('message');

        event(new Message($text, $user));
    
        return [];
    }
}
