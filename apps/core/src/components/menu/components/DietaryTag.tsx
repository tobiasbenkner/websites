// src/components/Menu/components/DietaryTag.tsx
import React from 'react';

type TagType = 'dietary' | 'allergy' | 'availability';

type Props = {
    type: TagType;
    label: string;
};

const tagStyles: Record<TagType, { base: string; label: Record<string, string> }> = {
    dietary: {
        base: 'bg-green-100 text-green-800',
        label: {
            'vegetarian': 'Vegetarisch',
            'vegan': 'Vegan',
            'gluten-free': 'Glutenfrei',
        },
    },
    allergy: {
        base: 'bg-yellow-100 text-yellow-800',
        label: {
            'gluten': 'Gluten',
            'lactose': 'Laktose',
            'nuts': 'Nüsse',
            'fish': 'Fisch',
            'eggs': 'Eier',
        },
    },
    availability: {
        base: 'bg-red-100 text-red-800',
        label: {
            'Nicht verfügbar': 'Nicht verfügbar',
        },
    },
};

export function DietaryTag({ type, label }: Props) {
    const styles = tagStyles[type];
    // @ts-ignore
    const displayLabel = styles.label[label] || label;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.base}`}
        >
            {displayLabel}
        </span>
    );
}