<?php

namespace App\Http\Controllers;

use App\Models\Stack;
use Illuminate\Http\Request;

class StackController extends Controller
{
    public function index()
    {
        return Stack::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Stack::inst($request);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Stack  $service
     * @return Stack
     */
    public function show(Stack $stack)
    {
        return $stack;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stack  $stack
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stack $stack)
    {
        return Stack::edit($request, $stack);
    }
}
