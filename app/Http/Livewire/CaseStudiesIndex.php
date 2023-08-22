<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Statamic\Facades\Entry;
use Statamic\Facades\Term;

class CaseStudiesIndex extends Component
{

    public $industry = [];
    public $location = [];
    public $product = [];
    public $experience = [];

    protected $queryString = [
        'industry',
        'location',
        'product',
        'experience'
    ];

    public function render()
    {
        $industries = Term::query()
            ->where('taxonomy', 'industries')
            ->orderBy('title', 'asc')
            ->get();
        $locations = Term::query()
            ->where('taxonomy', 'locations')
            ->orderBy('title', 'asc')
            ->get();
        $products = Entry::query()
            ->where('collection', 'products')
            ->orderBy('order')
            ->get();
        $experiences = Entry::query()
            ->where('collection', 'experiences')
            ->orderBy('order')
            ->get();
        $case_studies = Entry::query()
            ->where('collection', 'case_studies')
            ->where('published', true)
            ->orderBy('order')
            ->when($this->industry, function ($query) {
                return $query->whereJsonContains('industries', $this->industry);
            })
            ->when($this->location, function ($query) {
                return $query->whereJsonContains('locations', $this->location);
            })
            ->when($this->product, function ($query) use ($products) {
                $productIds = $products->whereIn('slug', $this->product)->pluck('id')->all();
                return $query->whereJsonContains('products', $productIds);
            })
            ->when($this->experience, function ($query) use ($experiences) {
                $experienceIds = $experiences->whereIn('slug', $this->experience)->pluck('id')->all();
                return $query->whereIn('experience', $experienceIds);
            });

        return view('livewire.case-studies-index', [
            'case-studies' => $case_studies,
            'industries' => $this->moveOtherToEnd($industries),
            'locations' => $locations,
            'products' => $products,
            'experiences' => $experiences
        ]);
    }

    public function resetFilters()
    {
        $this->reset();
    }

    public function moveOtherToEnd($collection){
        //move the item with the name == 'Other' to the end of the collection      
        return $collection->reject(function($value){
            return $value['title'] =='Other';
        })
        ->merge($collection->filter(function($value){
            return $value['title'] =='Other';
            })
        );
    }
}
