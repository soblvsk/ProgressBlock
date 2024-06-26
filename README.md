# [🔄 Progress Block](https://soblvsk.github.io/ProgressBlock/)

Прототип блока Progress для использования в мобильных web-приложениях. Основное предназначение блока отображать процесс выполнения процессов и их прогресс выполнения.
![image](https://github.com/soblvsk/ProgressBlock/assets/81454805/43ce5459-9221-40c6-8c3c-4eed3d0e9ea5)

## 📜 Information

- Адаптивная верстка.
- Использование `CSS Modules`.
- Компоненты созданы с помощью `Custom Elements`.
- `progress-component` - компонент, представляющий прогресс в виде круга. Он отображает прогресс в зависимости от заданного значения и может быть анимирован или скрыт.

  - `value` (число от 0 до 100): управляет размером дуги, отображающий прогресс.
  - `animated` (булевый): при наличии включает анимацию прогресса.
  - `hide` (булевый): при наличии скрывает круг прогресса.

- `progress-panel-component` - компонент панели управления для `progress-component`. Он позволяет пользователю изменять значение прогресса, включать/выключать анимацию и скрывать/показывать прогресс-бар.
- `input-component` - компонент для создания `input`, который принимает все атрибуты `HTMLInputElement`.

## ⚙️ Tech Stack

- TypeScript
- Vite
