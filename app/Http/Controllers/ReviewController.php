<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{

    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Book $book)
    {
        // return view('books.reviews.create',['book' => $book]); 
        return Inertia::render('Review/Create', ['book' => $book]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Book $book)
    {
        $data = $request->validate([
            'review' => 'required|min:15',
            'rating' => 'required|min:1|max:5|integer'
        ]);
        $book->reviews()->create($data); // this will not only create it also saves the book
        
        $book = Book::with([
            'reviews' => function ($query) {
                $query->latest();
            }
        ])->withAvgRating()->withReviewscount()->findOrFail($book->id);
        // dd($book);
        return Inertia::render('Review/Reviews', ['book' => $book]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
