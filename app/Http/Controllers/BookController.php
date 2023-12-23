<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Book;
use Inertia\Inertia;

class BookController extends Controller
{

    public function index(Request $request)
    {
        $title  = $request->input('title');
        $filter = $request->input('filter');
        $page   = $request->has('page') ? $request->query('page') : 1;

        $books = Book::when($title, fn ($query , $title)=> $query->title($title) );
        
        $books = match($filter) {
            'popular_last_month'        => $books->popularLastMonth(),
            'popular_last_6months'      => $books->popularLast6Month(),
            'highest_rated_last_month'  => $books->highestRatedLastMonth(),
            'highest_rated_last_6months'=> $books->highestRatedLast6Month(),
            default                     => $books->latest()
        };
        $books = $books->paginate(10);
        // $books = $books->get();
        $cacheKey = 'books:' . $filter . ':' . $title . ':' . $page;
        $books = cache()->remember($cacheKey, 3600, fn() => $books);

        return Inertia::render('Book/BookList', ['books' => $books, 'title'=>$title, 'filter'=>$filter]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $cacheKey = 'book:'. $id;

        $book = cache()->remember($cacheKey,
            3600,
            fn() =>
            Book::with([
                'reviews' => fn($query) => $query->latest()
            ])->withAvgRating()->withReviewscount()->findOrFail($id)
        );
        // return view('books.show', ['book' => $book ]);
        return Inertia::render('Review/Reviews', ['book' => $book]);
    }

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
