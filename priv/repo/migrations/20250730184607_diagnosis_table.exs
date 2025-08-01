defmodule ElixirProject.Repo.Migrations.AddDiagnosesTable do
  use Ecto.Migration

  # mix ecto.reset
  # mix ecto.migrate
  # mix ecto.rollback --step 1

  def change do
    create table("diagnoses") do
      add :input, :string
      add :diagnosis, :string
      timestamps()
    end
  end
end
