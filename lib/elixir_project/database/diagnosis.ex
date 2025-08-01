defmodule ElixirProject.Diagnosis do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :input, :diagnosis, :inserted_at]}

  schema "diagnoses" do
    field :input, :string
    field :diagnosis, :string
    timestamps()
  end

  def changeset(diagnoses, params \\ %{}) do
    diagnoses
    |> cast(params, [:input, :diagnosis])
  end
end
