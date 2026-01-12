#!/usr/bin/env bash
set -euo pipefail

output_file="output.md"

exclude_dirs=(
  "output" ".git" ".expo" ".idea" ".vscode" "locales"
  "node_modules" "build" "public" "dist" "releases" "app\/locales"
)

exclude_extensions=(
  "bat" "sh" "mp4" "png" "jpg" "jpeg" "json" "ico"
  "jar" "war" "pdf" "bin" "bat" "lock" "lockb" "ttf"
)

exclude_files=(
  "svg"  ".java-version" ".gitattributes" "gradlew" "output.txt" "output.md" ".DS_Store"
  ".gitignore" "gradlew" ".env.local"
)

prune_expr=""
for dir in "${exclude_dirs[@]}"; do
  prune_expr+="-name '$dir' -o "
done
prune_expr=${prune_expr%-o *}

file_expr=""
for file in "${exclude_files[@]}"; do
  file_expr+="! -name '$file' "
done

ext_expr=""
for ext in "${exclude_extensions[@]}"; do
  ext_expr+="! -name '*.$ext' "
done

FILES=()
while IFS= read -r file; do
  FILES+=("$file")
done < <(
  eval "find . -type d \\( $prune_expr \\) -prune -o -type f $file_expr $ext_expr -print"
)

printf '%s\n' "${FILES[@]}"

read -r -p "Proceed and generate output.md? [y/N] " confirm
[[ "$confirm" == "y" || "$confirm" == "Y" ]] || exit 0

: > "$output_file"

for file in "${FILES[@]}"; do
  {
    printf "\n## %s\n\n\`\`\`\n" "$file"
    cat "$file"
    printf "\n\`\`\`\n"
  } >> "$output_file"
done
