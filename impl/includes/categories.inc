{% component source: "{{source}}", layout: "", type: "module", limit:"1000", filterBy: "parentid", filterValue:"{{parentItemId}}", collectionVariable: "allItems" %}

{% assign objectCategories = "," %}
{% for item in allItems.items %}
    {% for itemcategory in item.itemCategories %}
        {% assign itemCategoriestr = "," | append: itemcategory | append: "," %}
        {% unless objectCategories contains itemCategoriestr %}
        {% assign objectCategories = objectCategories | append: itemcategory | append: "," %}
        {% endunless %}
    {% endfor %}
{% endfor %}
{% assign objectCategories = objectCategories | split: "," %}

{% assign counter = '' %}
{% for category in objectCategories %}
    {% assign count = 0 %}
    {% for item in allItems.items %}
        {% for itemTag in item.itemCategories %}
            {% if itemTag == tag %}
                {% assign count = count | plus: 1%}
            {% endif %}
        {% endfor %}
    {% endfor %}
    {% assign counter = counter | append: count | append: ',' %}
{% endfor %}

{% assign counter = counter | split: ',' %}

{% for objectCategories in objectCategories %}
    {% if objectCategories != "" %}
        {{tpl | replace: "[[category]]",  objectCategories | replace: "[[count]]", counter[forloop.index0]}}
    {% endif %}
{% endfor %}