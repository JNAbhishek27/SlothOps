import React, { useState } from 'react';
import { FRIDGE_PRESETS } from '../data/samplePresets.ts';
import { RecipeResult } from '../types.ts';

interface FridgeStareEliminatorProps {
  selectedModel: string;
}

export const FridgeStareEliminator: React.FC<FridgeStareEliminatorProps> = ({ selectedModel }) => {
  const [ingredientList, setIngredientList] = useState<string[]>(FRIDGE_PRESETS[0].ingredients);
  const [newIngredient, setNewIngredient] = useState('');
  const [cookTimeLimit, setCookTimeLimit] = useState('10 mins');
  const [dishLimit, setDishLimit] = useState('1 pan');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeResult | null>(null);
  const [copiedGrocery, setCopiedGrocery] = useState(false);

  const handleLoadPreset = (presetId: string) => {
    const found = FRIDGE_PRESETS.find(p => p.id === presetId);
    if (found) {
      setIngredientList(found.ingredients);
      setRecipe(null);
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredientList.includes(newIngredient.trim())) {
      setIngredientList([...ingredientList, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (idx: number) => {
    setIngredientList(ingredientList.filter((_, i) => i !== idx));
  };

  const handleGenerateRecipe = async () => {
    if (ingredientList.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch('/api/fridge-to-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: ingredientList,
          cookingTimeLimit: cookTimeLimit,
          dishLimit,
          modelEngine: selectedModel
        })
      });

      const data = await res.json();
      if (data.success) {
        setRecipe(data);
      }
    } catch (err) {
      console.error('Failed to generate recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyGroceries = () => {
    if (!recipe || !recipe.missingGroceries) return;
    const text = recipe.missingGroceries
      .map(g => `- [ ] ${g.item} (${g.category} · ${g.priority})`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedGrocery(true);
    setTimeout(() => setCopiedGrocery(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#9eb09e] mb-1">
          <span>Tool 02</span>
          <span aria-hidden="true">·</span>
          <span>Fridge Stare Eliminator</span>
          <span aria-hidden="true">·</span>
          <span>Never Stand With The Door Open Again</span>
        </div>
        <h2 className="text-2xl font-bold text-[#f2f4f1] tracking-tight">
          Turn Surviving Ingredients Into a 1-Pan Meal
        </h2>
        <p className="text-sm text-[#b2c4b2] mt-1 max-w-2xl leading-relaxed">
          Stop staring into the cold abyss of your refrigerator for 5 minutes. Select what you have lying around, and the model creates a delicious meal under 3 steps with absolute minimum dishwashing, plus an auto-compiled grocery list.
        </p>
      </div>

      {/* Preset Selectors */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-medium text-[#9eb09e] mr-1">Load Pantry Snapshot:</span>
        {FRIDGE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleLoadPreset(preset.id)}
            className="px-3 py-1.5 text-xs font-medium bg-[#172219] hover:bg-[#202f23] text-[#cfdcce] border border-[#2d3e30] rounded-lg transition-colors cursor-pointer"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Ingredient Tag Cloud & Control Bar */}
      <div className="bg-[#141b16] border border-[#27382b] rounded-xl p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-[#9eb09e] mb-2">
            <span>Available Ingredients in Fridge/Pantry:</span>
            <span>{ingredientList.length} items logged</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {ingredientList.map((ing, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1c271e] text-[#d6e4d4] border border-[#2e4031] rounded-md text-xs"
              >
                <span>{ing}</span>
                <button
                  onClick={() => removeIngredient(idx)}
                  className="text-[#879d87] hover:text-[#e89178] transition-colors cursor-pointer text-xs leading-none"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add custom ingredient */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
              placeholder="Add another ingredient (e.g. leftover rice, garlic, hot sauce)..."
              className="flex-1 bg-[#0e130f] border border-[#263729] rounded-lg px-3 py-2 text-xs text-[#f2f4f1] placeholder-[#576b57] focus:outline-none focus:border-[#a8d5a2]"
            />
            <button
              onClick={addIngredient}
              className="px-3 py-2 text-xs font-medium text-[#cfdcce] bg-[#1a251c] hover:bg-[#243327] border border-[#2d3e30] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Sloth Effort Constraints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#223126]">
          <div>
            <label className="text-xs font-medium text-[#9eb09e] block mb-1">Max Cooking Time</label>
            <div className="flex items-center gap-2">
              {['5 mins', '10 mins', '15 mins'].map((time) => (
                <button
                  key={time}
                  onClick={() => setCookTimeLimit(time)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    cookTimeLimit === time
                      ? 'bg-[#293c2c] text-[#a8d5a2] border border-[#a8d5a2]/40'
                      : 'bg-[#101511] text-[#869b86] border border-[#233326] hover:text-[#d6e4d4]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9eb09e] block mb-1">Dish Budget</label>
            <div className="flex items-center gap-2">
              {['1 pan', '1 mug', 'No heat (raw assembly)'].map((limit) => (
                <button
                  key={limit}
                  onClick={() => setDishLimit(limit)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    dishLimit === limit
                      ? 'bg-[#293c2c] text-[#a8d5a2] border border-[#a8d5a2]/40'
                      : 'bg-[#101511] text-[#869b86] border border-[#233326] hover:text-[#d6e4d4]'
                  }`}
                >
                  {limit}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#223126]">
          <div className="text-xs text-[#899f89]">
            Local Privacy: <span className="font-mono text-[#a8d5a2]">Pantry never logged to cloud</span>
          </div>
          <button
            onClick={handleGenerateRecipe}
            disabled={loading || ingredientList.length === 0}
            className="px-5 py-2 text-xs font-semibold text-[#0d140e] bg-[#a8d5a2] hover:bg-[#bae0b5] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">🍳</span>
                <span>Generating low-effort meal...</span>
              </>
            ) : (
              <>
                <span>Generate Zero-Effort Meal</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recipe Output */}
      {recipe && (
        <div className="bg-[#162018] border border-[#2b3d2e] rounded-xl p-6 space-y-6">
          {/* Title & Metadata Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#243427]">
            <div>
              <div className="text-xs font-mono text-[#a8d5a2] mb-1">SLOTH CHEF VERDICT</div>
              <h3 className="text-xl font-bold text-[#f2f4f1] tracking-tight">{recipe.recipeTitle}</h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#9eb09e]">
              <div>Prep: <span className="text-[#a8d5a2] tabular-nums">{recipe.prepTime}</span></div>
              <div>Cook: <span className="text-[#a8d5a2] tabular-nums">{recipe.cookTime}</span></div>
              <div>Dishes: <span className="text-[#f2f4f1] font-semibold">{recipe.dishesUsed}</span></div>
            </div>
          </div>

          {/* Under 3 Steps */}
          <div>
            <span className="text-xs font-semibold text-[#a8d5a2] block mb-3">
              Preparation Steps (Max Laziness)
            </span>
            <div className="space-y-3">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[#111712] border border-[#233325] rounded-lg">
                  <span className="text-xs font-mono font-bold text-[#a8d5a2] mt-0.5">0{idx + 1}.</span>
                  <p className="text-xs sm:text-sm text-[#e0e9df] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sloth Tip */}
          <div className="p-3.5 bg-[#1b261e] border border-[#2e4232] rounded-lg flex items-start gap-3">
            <span className="text-lg">🦥</span>
            <div>
              <div className="text-xs font-semibold text-[#a8d5a2]">Sloth Energy Conservation Rule:</div>
              <p className="text-xs text-[#c6d7c4] mt-0.5">{recipe.lazyTip}</p>
            </div>
          </div>

          {/* Missing Groceries Checklist */}
          {recipe.missingGroceries && recipe.missingGroceries.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#a8d5a2]">
                  Auto-Compiled Grocery Gap Checklist
                </span>
                <button
                  onClick={handleCopyGroceries}
                  className="text-xs text-[#a8d5a2] hover:text-[#c4eec0] transition-colors cursor-pointer font-mono"
                >
                  {copiedGrocery ? '✓ Copied to clipboard!' : 'Copy checklist'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recipe.missingGroceries.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#111712] border border-[#233325] rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="text-[#f2f4f1] font-medium">{item.item}</span>
                      <div className="text-[11px] text-[#7d967d] mt-0.5">{item.category}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2c20] text-[#a8d5a2]">
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
