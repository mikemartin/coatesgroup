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
            ->orderBy('entries_count', 'desc')
            ->get();
        $locations = Term::query()
            ->where('taxonomy', 'locations')
            ->orderBy('entries_count', 'desc')
            ->get();
        $products = Entry::query()
            ->where('collection', 'products')
            ->get();
        $experiences = Entry::query()
            ->where('collection', 'experiences')
            ->get();
        $case_studies = Entry::query()
            ->where('collection', 'case_studies')
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
            'industries' => $industries,
            'locations' => $locations,
            'products' => $products,
            'experiences' => $experiences
        ]);
    }

    public function resetFilters()
    {
        $this->reset();
    }
}
