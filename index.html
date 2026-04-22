from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController
import random

# ==========================================
# WANO STUDIO - ADVANCED 3D ENGINE SETUP
# ==========================================
app = Ursina(title="Wano Studio 3D Masterpiece", fullscreen=False)

# إعدادات البيئة والإضاءة المعقدة
window.color = color.rgb(10, 10, 20)
scene.fog_density = 0.02
scene.fog_color = color.rgb(10, 10, 20)

# ==========================================
# CLASS DEFINITIONS FOR GAME MECHANICS
# ==========================================

class Voxel(Button):
    def __init__(self, position=(0,0,0), texture='white_cube', color_hue=color.color(0,0,random.uniform(0.9, 1.0))):
        super().__init__(
            parent=scene,
            position=position,
            model='cube',
            origin_y=0.5,
            texture=texture,
            color=color_hue,
            highlight_color=color.lime,
            collider='box'
        )

    def input(self, key):
        if self.hovered:
            if key == 'left mouse down':
                # بناء مكعب جديد
                Voxel(position=self.position + mouse.normal, texture='brick', color_hue=color.random_color())
            if key == 'right mouse down':
                # تدمير المكعب
                destroy(self)

class AdvancedEnemy(Entity):
    def __init__(self, position=(0, 0, 0)):
        super().__init__(
            parent=scene,
            position=position,
            model='cube',
            texture='noise',
            color=color.red,
            scale=(1, 2, 1),
            collider='box'
        )
        self.speed = random.uniform(1.5, 3.0)
        self.direction = Vec3(random.uniform(-1, 1), 0, random.uniform(-1, 1)).normalized()

    def update(self):
        # ذكاء اصطناعي بسيط للحركة العشوائية
        self.position += self.direction * self.speed * time.dt
        
        # تغيير الاتجاه إذا وصل للحدود
        if abs(self.x) > 20 or abs(self.z) > 20:
            self.direction = Vec3(random.uniform(-1, 1), 0, random.uniform(-1, 1)).normalized()

class GameUI(Entity):
    def __init__(self):
        super().__init__(parent=camera.ui)
        self.score = 0
        self.score_text = Text(text=f'Score: {self.score}', position=(-0.85, 0.45), scale=2, color=color.cyan)
        self.crosshair = Entity(parent=camera.ui, model='quad', color=color.white, scale=0.01, rotation_z=45)
        self.warning_text = Text(text='SYSTEM ONLINE - WANO 2026', position=(-0.85, 0.40), scale=1.2, color=color.orange)

    def add_score(self, amount):
        self.score += amount
        self.score_text.text = f'Score: {self.score}'

# ==========================================
# WORLD GENERATION (PROCEDURAL)
# ==========================================
voxels = []
print("[SYSTEM] Generating 3D Procedural World...")
for z in range(25):
    for x in range(25):
        # إنشاء تضاريس عشوائية بسيطة
        y_height = random.choice([0, 0, 0, 1, 1, 2]) if random.random() > 0.8 else 0
        voxel = Voxel(position=(x - 12, y_height, z - 12))
        voxels.append(voxel)

# ==========================================
# PLAYER AND ENTITY INITIALIZATION
# ==========================================
player = FirstPersonController(y=5, jump_height=2.5, jump_up_duration=0.4, mouse_sensitivity=Vec2(50, 50))
ui_manager = GameUI()

enemies = []
for _ in range(5):
    enemy = AdvancedEnemy(position=(random.randint(-10, 10), 1, random.randint(-10, 10)))
    enemies.append(enemy)

# ==========================================
# MAIN GAME LOOP & PHYSICS
# ==========================================
def update():
    # تأثيرات بصرية وإدارة حالة اللعبة
    if player.y < -10:
        player.position = (0, 10, 0) # إعادة الترسب (Respawn)
        ui_manager.warning_text.text = "WARNING: FALL DETECTED"
        ui_manager.warning_text.color = color.red
    
    # خروج من اللعبة
    if held_keys['escape']:
        print("[SYSTEM] Shutting down Wano Engine...")
        application.quit()

# ==========================================
# EXECUTION
# ==========================================
if __name__ == '__main__':
    app.run()
