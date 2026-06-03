class CreateCategories < ActiveRecord::Migration[7.2]
  def change
    create_table :categories, if_not_exists: true do |t|
      t.string :name, null: false, limit: 100
      t.boolean :is_deleted, null: false, default: false
      t.timestamps
    end

    add_index :categories, :name, unique: true
  end
end
